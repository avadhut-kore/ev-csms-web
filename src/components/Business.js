import React from 'react'
import localImage from './../asset/img/images (4).jpg';

const Business = () => {
    return (
        <div style={styles.container}>
            <div style={styles.imageContainer}>
                <img 
                    src={localImage} // Replace with your image URL
                    alt="Electric Vehicle Charger"
                    style={styles.image}
                />
            </div>
            <div style={styles.textContainer}>
                <h1 style={styles.title}>Welcome to Our EV Charging Station</h1>
                <p style={styles.description}>
                    Join the largest EV community. Fast and Free!
                </p>
                <h2 style={styles.subTitle}>Exclusive Member Benefits:</h2>
                <ul style={styles.benefitsList}>
                    <li>Add your voice. Leave reviews, tips, photos, and more.</li>
                    <li>Add your vehicle. Automatically see only compatible chargers.</li>
                    <li>Exclusive access to Trip Planner: smart routing for long journeys.</li>
                    <li>Alerts when chargers open near you (app only).</li>
                    <li>Driver to driver messaging (app only).</li>
                </ul>
            </div>
        </div>
    );
}

export default Business


const styles = {
    container: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '20px',
        backgroundColor: '#f7f7f7',
    },
    imageContainer: {
        flex: 1,
        padding: '20px',
    },
    image: {
        width: '100%',
        height: 'auto',
        borderRadius: '10px',
    },
    textContainer: {
        flex: 1,
        padding: '20px',
        maxWidth: '600px',
    },
    title: {
        fontSize: '2.5em',
        marginBottom: '10px',
    },
    description: {
        fontSize: '1.2em',
        marginBottom: '20px',
    },
    subTitle: {
        fontSize: '1.5em',
        marginBottom: '10px',
    },
    benefitsList: {
        listStyleType: 'none',
        padding: '0',
        fontSize: '1.1em',
    },
};