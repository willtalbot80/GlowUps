import React, { useState } from 'react';

const StarRating = ({ rating = 0, maxStars = 5, onRate, size = 'md', readOnly = false }) => {
    const [hovered, setHovered] = useState(0);

    const starSize = size === 'sm' ? '0.85rem' : size === 'lg' ? '1.5rem' : '1.1rem';

    return (
        <div style={{ display: 'inline-flex', gap: '2px' }}>
            {Array.from({ length: maxStars }, (_, i) => {
                const val = i + 1;
                const filled = (hovered || rating) >= val;
                return (
                    <span
                        key={i}
                        onClick={() => !readOnly && onRate && onRate(val)}
                        onMouseEnter={() => !readOnly && setHovered(val)}
                        onMouseLeave={() => !readOnly && setHovered(0)}
                        style={{
                            fontSize: starSize,
                            color: filled ? '#b8860b' : '#e8d5c4',
                            cursor: readOnly ? 'default' : 'pointer',
                            transition: 'color 0.15s',
                            userSelect: 'none',
                        }}
                    >
                        ★
                    </span>
                );
            })}
        </div>
    );
};

export default StarRating;
