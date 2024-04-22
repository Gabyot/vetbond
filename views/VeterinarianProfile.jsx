import React from 'react';

function VeterinarianProfile() {
    return (
        <div className="veterinarian-profile">
            <div className="veterinarian-info">
                <img src="veterinarian1.jpg" alt="Veterinarian Photo" className="profile-photo" />
                <h2 className="name">Dr. Juan Pérez</h2>
                <a href="reviews.html" className="reviews-link">Ver Reseñas</a>
                <p className="address">Dirección: <a href="map.html">123 Calle Principal, Ciudad</a></p>
                <select className="services">
                    <option value="checkup">Chequeo General</option>
                    <option value="vaccination">Vacunación</option>
                    <option value="surgery">Cirugía</option>
                </select>
                <p className="price">$50</p>
            </div>
            <div className="availability-calendar">
                {/* Aquí iría el componente del calendario de disponibilidad */}
            </div>
        </div>
    );
}

export default VeterinarianProfile;
