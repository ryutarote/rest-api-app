import React, { useEffect, useState } from 'react';

interface WeatherData {
	name: string;
	main: {
		temp: number;
		temp_min: number;
		temp_max: number;
		humidity: number;
	};
	weather: {
		description: string;
		icon: string;
	}[];
}

const WeatherWidget: React.FC = () => {
	const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
	const [loading, setLoading] = useState<boolean>(true);
	const [city, setCity] = useState<string>('Tokyo');
	const [error, setError] = useState<string | null>(null);

	const fetchWeather = async () => {
		try {
			const response = await fetch(
				`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_OPENWEATHERMAP_API_KEY}`
			);
			if (!response.ok) {
				throw new Error('天気データの取得に失敗しました');
			}
			const data: WeatherData = await response.json();
			setWeatherData(data);
		} catch (err) {
			setError((err as Error).message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchWeather();
	}, [city]);

	if (loading) {
		return (
			<div className='flex items-center justify-center h-40'>
				<div className='animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500'></div>
			</div>
		);
	}
	if (error) return <div>エラー: {error}</div>;

	return (
		<div>
			<h3 className='text-lg font-bold'>今日の天気</h3>
			<div className='flex justify-center'>
				<img
					alt='weather'
					src={`https://openweathermap.org/img/wn/${weatherData?.weather[0].icon}@2x.png`}
				/>
			</div>
			<div className='flex gap-2 items-center justify-center mt-2'>
				<p>現在の気温</p>
				<p>{Math.round(weatherData?.main.temp || 0)}°C</p>
			</div>
			<div className='flex gap-2 items-center justify-center mt-2'>
				<p>
					{Math.round(weatherData?.main.temp_min || 0)}°C /{' '}
					{Math.round(weatherData?.main.temp_max || 0)}°C
				</p>
			</div>

			<div className='flex flex-col items-center mt-2'>
				<select
					className='border border-gray-300 rounded-md p-2 text-sm w-full'
					onChange={(e) => setCity(e.target.value)}
				>
					<option value='Tokyo'>東京</option>
					<option value='Osaka'>大阪</option>
					<option value='Nagoya'>愛知</option>
					<option value='Sapporo'>北海道</option>
					<option value='Naha'>沖縄</option>
				</select>
			</div>
		</div>
	);
};

export default WeatherWidget;
