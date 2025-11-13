'use client'
import React, { useState, useEffect, useRef } from 'react';
import { BsQuestionCircle } from 'react-icons/bs';
import './helpIcon.css';

interface HelpIconProps {
    content: string | React.ReactNode;
    position?: 'top' | 'bottom' | 'left' | 'right';
    size?: number;
    light?: boolean;
    dark?: boolean;
}

export default function HelpIcon({ content, position = 'right', size = 20, light = false, dark = false }: HelpIconProps) {
    const [isOpen, setIsOpen] = useState(false);
    const tooltipRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (tooltipRef.current && !tooltipRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    const iconClass = dark ? 'help-icon-dark' : light ? 'help-icon-light' : '';

    return (
        <div className="help-icon-container" ref={tooltipRef}>
            <BsQuestionCircle
                className={`help-icon ${iconClass}`}
                size={size}
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                }}
                title="Click for help"
            />
            {isOpen && (
                <div className="help-tooltip-fixed">
                    <div className="help-tooltip-content">
                        {content}
                    </div>
                    <button
                        className="help-tooltip-close"
                        onClick={() => setIsOpen(false)}
                    >
                        ×
                    </button>
                </div>
            )}
        </div>
    );
}
