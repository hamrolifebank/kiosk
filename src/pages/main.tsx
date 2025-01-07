import Logo from '@/assets/hamrolifebank.png';
import { useEffect, useState } from 'react';
import '../styles/app.css';

let slideCount = 0;

export function MainPage() {
  const [total, setTotal] = useState(0);
  const [currentSlide, setCurrentSlide] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  //const [slideCount, setSlideCount] = useState(0); // Track the slide change count
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null); // Track active timeout

  const fetchTotal = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/stats/total`
      );

      const data = await response.json();
      setTotal(data?.count);
      console.log('count ', data?.count);
    } catch (error) {
      console.error('Error fetching total count:', error);
    }
  };

  const startSlideShow = (slides: any[]) => {
    if (slides.length === 0) return;

    const prioritySlides = slides.filter((slide) => slide.isPriority);
    const regularSlides = slides.filter((slide) => !slide.isPriority);

    let nextSlide;
    // Ensure at least one priority slide appears every 3 slides
    if (prioritySlides.length > 0 && slideCount % 4 === 0) {
      const randomIndex = Math.floor(Math.random() * prioritySlides.length);
      nextSlide = prioritySlides[randomIndex];
    } else {
      const randomIndex = Math.floor(Math.random() * regularSlides.length);
      nextSlide = regularSlides[randomIndex];
    }

    const slideUrl = nextSlide.isPhoto
      ? `/photo?url=${encodeURIComponent(nextSlide.url)}`
      : nextSlide.url;

    setCurrentSlide(slideUrl);
    slideCount++;

    const duration = nextSlide.duration || 10000;

    // Clear any existing timeouts before setting a new one
    if (timeoutId) clearTimeout(timeoutId);
    fetchTotal();

    const id = setTimeout(() => {
      startSlideShow(slides);
    }, duration);

    setTimeoutId(id); // Save timeout ID to clear later
  };

  useEffect(() => {
    const fetchSlides = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/slides`);
        const data = await response.json();

        if (data.length > 0) {
          setIsLoading(false);
          startSlideShow(data); // Start slideshow after slides are fetched
        }
      } catch (error) {
        console.error('Error fetching slide list:', error);
        setIsLoading(false); // Stop loading even if there's an error
      }
    };

    fetchSlides();
    fetchTotal(); // Fetch total count simultaneously
  }, []);

  useEffect(() => {
    return () => {
      // Clear timeout when component unmounts
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [timeoutId]);

  if (isLoading) {
    return (
      <div className="loading">
        <p>Loading slides...</p>
      </div>
    );
  }

  return (
    <div>
      <div className="grid grid-cols-2 md:grid-cols-2 gap-4 p-4">
        <img style={{ width: '100px' }} id="logoHLB" src={Logo} />
        <span className="text-4xl font-bold text-center text-red-600 text-right">
          <b>#SmartBlood</b>
        </span>
      </div>
      <div>
        <iframe
          className="frame"
          name="displayFrame"
          src={currentSlide}
          allowFullScreen={true}
        ></iframe>
      </div>
      <footer className="footer">
        <h1 className="total-count text-3xl">
          Donation Count: <span className="text-red-600 text-4xl">{total}</span>
          <span className="pl-1 text-base">pints</span>
        </h1>
      </footer>
    </div>
  );
}

export default MainPage;
