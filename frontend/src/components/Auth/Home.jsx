import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import useIntersectionObserver from '../../Hooks/useIntersectionObserver';
import axiosInstance from '../../utils/axiosInstance'; 
import { useNavigate } from 'react-router-dom'; 
import '../../styles/Home.css';

const Home = () => {
    const [containerRef, isVisible] = useIntersectionObserver({ threshold: 0.1 });
    const [displayText, setDisplayText] = useState('');
    const [typingCompleted, setTypingCompleted] = useState(false);
    const [userProfile, setUserProfile] = useState(null); 
    const fullText = "I'm an aspiring Fullstack developer, Interested in MERN";
    const navigate = useNavigate(); 

    useEffect(() => {
        if (isVisible && !typingCompleted) {
            let index = 0;
            const interval = setInterval(() => {
                setDisplayText((prev) => prev + fullText.charAt(index));
                index += 1;
                if (index >= fullText.length) {
                    clearInterval(interval);
                    setTypingCompleted(true);
                }
            }, 100);
        }
    }, [isVisible, typingCompleted]);

   useEffect(() => {
    const fetchUserProfile = async () => {
        try {
            const response = await axiosInstance.get('/users/profile', { withCredentials: true });
            console.log('User Profile Response:', response); 
            console.log('User Profile Response Data:', response.data);
            if (response.data && response.data.data) {
                setUserProfile(response.data.data);
            } else {
                console.error("User profile data is missing in response");
                setUserProfile(null);
            }
        } catch (error) {
            console.error("Failed to fetch user profile", error);
            setUserProfile(null);
        }
    };

    fetchUserProfile();
}, []); 


    const handleLogout = async () => {
        try {
            await axiosInstance.post('/users/logout', {}, { withCredentials: true });
            setUserProfile(null); 
            alert("Logout successful");
            navigate('/login'); 
        } catch (error) {
            console.error("Logout failed", error);
            alert("Logout failed. Please try again.");
        }
    };

    return (
        <motion.section
            ref={containerRef}
            className="hero-section"
            initial={{ opacity: 0 }}
            animate={{ opacity: isVisible ? 1 : 0 }}
            transition={{ duration: 1 }}
        >
            <h1>Hi, this is Meena Jayaraj.</h1>
            <h1>Here is My Project OTP Manager</h1>
            <p>{displayText}</p>
            <a href="/Resume.pdf" download className="download-button">
                Download Resume
            </a>

            {/* Logout button in top right corner */}
            {userProfile ? (
                <div className="logout-container">
                    <button onClick={handleLogout} className="logout-button">
                        Logout
                    </button>
                </div>
            ) : (
                <p>Loading user profile...</p> 
            )}
        </motion.section>
    );
};

export default Home;
