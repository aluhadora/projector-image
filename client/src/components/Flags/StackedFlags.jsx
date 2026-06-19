import './Flags.css';
import React, { useState, useCallback, useMemo } from 'react';
import flagsData from './flagsData.json';
import Flags from './Flags';

function StackedFlags({ classNames = [] }) {
    return (
        <div className={`Stacked-Flags-container`}>
            <div>
                <Flags classNames={[...classNames, "short"]} />
                <Flags classNames={[...classNames, "short"]} />
                <Flags classNames={[...classNames, "short"]} />
                <Flags classNames={[...classNames, "short"]} />
            </div>
            <div>
                <Flags classNames={[...classNames, "short"]} />
                <Flags classNames={[...classNames, "short"]} />
                <Flags classNames={[...classNames, "short"]} />
                <Flags classNames={[...classNames, "short"]} />
            </div>
            <div>
                <Flags classNames={[...classNames, "short"]} />
                <Flags classNames={[...classNames, "short"]} />
                <Flags classNames={[...classNames, "short"]} />
                <Flags classNames={[...classNames, "short"]} />
            </div>
        </div>
    );
}

export default StackedFlags;
