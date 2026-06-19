import './Flags.css';
import React, { useState, useCallback, useMemo } from 'react';
import flagsData from './flagsData.json';

const regionNames =
    typeof Intl !== 'undefined' && Intl.DisplayNames
        ? new Intl.DisplayNames(['en'], { type: 'region' })
        : null;

function getCountryName(code) {
    const fallback = flagsData.fallbackNames[code];
    if (fallback) return fallback;
    if (regionNames) {
        try {
            const name = regionNames.of(code.toUpperCase());
            if (name && name.toUpperCase() !== code.toUpperCase()) return name;
        } catch (e) {
            // ignore
        }
    }
    return code.toUpperCase();
}

function pickRandomCode(exclude) {
    const codes = flagsData.codes;
    if (codes.length <= 1) return codes[0];
    let next = codes[Math.floor(Math.random() * codes.length)];
    // Avoid repeating the same flag back-to-back
    while (next === exclude) {
        next = codes[Math.floor(Math.random() * codes.length)];
    }
    return next;
}

function Flags({ classNames = [] }) {
    const [code, setCode] = useState(() => pickRandomCode(null));
    // Bump a key on each cycle so the CSS animation restarts cleanly.
    const [cycle, setCycle] = useState(0);

    const speedClass =
        classNames.find((c) => c && c.endsWith('Rotation')) || 'mediumRotation';
    const brightnessClass =
        classNames.find((c) =>
            ['bright', 'mediumBright', 'dark', 'black'].includes(c)
        ) || 'bright';
    const fadeClass =
        classNames.find((c) => c && c.startsWith('fade')) || '';
    const invertedClass = classNames.includes('inverted') ? 'inverted' : '';
    const shortClass = classNames.includes('short') ? 'short' : '';

    const onAnimationEnd = useCallback(
        (e) => {
            // Only react to the scroll animation, not to fade/etc.
            if (e.animationName === 'Flag-scroll') {
                setCode((prev) => pickRandomCode(prev));
                setCycle((c) => c + 1);
            }
        },
        []
    );

    const name = useMemo(() => getCountryName(code), [code]);
    const src = `images/flags/flag-icons-main/${code}.svg`;

    return (
        <div className={`Flags-container ${brightnessClass} ${fadeClass} ${invertedClass} ${shortClass}`}>
            <div
                key={cycle}
                className={`Flags-scroller ${speedClass}`}
                onAnimationEnd={onAnimationEnd}
            >
                <img className={`Flags-img ${shortClass}`} src={src} alt={name} />
                <div className="Flags-name">{name}</div>
            </div>
        </div>
    );
}

export default Flags;
