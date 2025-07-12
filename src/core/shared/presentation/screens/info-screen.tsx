import React from 'react';

// Props enum for different screen types
export enum InfoScreenType {
    ERROR = 'error',
    WARNING = 'warning',
    EMPTY = 'empty'
}

// Icon components for different states
const ErrorIcon = () => (
    <svg
        className="w-16 h-16 text-red-500 mx-auto mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
        />
    </svg>
);

const WarningIcon = () => (
    <svg
        className="w-16 h-16 text-yellow-500 mx-auto mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
        />
    </svg>
);

const EmptyIcon = () => (
    <svg
        className="w-16 h-16 text-gray-400 mx-auto mb-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
        />
    </svg>
);

// Interface for component props
interface InfoScreenProps {
    type: InfoScreenType;
    title?: string;
    description?: string;
    actionButton?: {
        text: string;
        onClick: () => void;
        variant?: 'primary' | 'secondary';
    };
    className?: string;
}

// Default content for each screen type
const defaultContent = {
    [InfoScreenType.ERROR]: {
        title: 'Something went wrong',
        description: 'We encountered an error while processing your request. Please try again later.'
    },
    [InfoScreenType.WARNING]: {
        title: 'Attention needed',
        description: 'There are some issues that require your attention before proceeding.'
    },
    [InfoScreenType.EMPTY]: {
        title: 'No data available',
        description: 'There are no items to display at the moment.'
    }
};

const InfoScreen: React.FC<InfoScreenProps> = ({
    type,
    title,
    description,
    actionButton,
    className = ''
}) => {
    const content = defaultContent[type];
    const displayTitle = title || content.title;
    const displayDescription = description || content.description;

    const getIcon = () => {
        switch (type) {
            case InfoScreenType.ERROR:
                return <ErrorIcon />;
            case InfoScreenType.WARNING:
                return <WarningIcon />;
            case InfoScreenType.EMPTY:
                return <EmptyIcon />;
            default:
                return <EmptyIcon />;
        }
    };

    const getContainerClasses = () => {
        const baseClasses = 'flex flex-col items-center justify-center min-h-[400px] p-8 text-center';

        switch (type) {
            case InfoScreenType.ERROR:
                return `${baseClasses} bg-red-50 border border-red-200 rounded-lg`;
            case InfoScreenType.WARNING:
                return `${baseClasses} bg-yellow-50 border border-yellow-200 rounded-lg`;
            case InfoScreenType.EMPTY:
                return `${baseClasses} bg-gray-50 border border-gray-200 rounded-lg`;
            default:
                return `${baseClasses} bg-gray-50 border border-gray-200 rounded-lg`;
        }
    };

    const getTitleClasses = () => {
        switch (type) {
            case InfoScreenType.ERROR:
                return 'text-2xl font-semibold text-red-800 mb-2';
            case InfoScreenType.WARNING:
                return 'text-2xl font-semibold text-yellow-800 mb-2';
            case InfoScreenType.EMPTY:
                return 'text-2xl font-semibold text-gray-600 mb-2';
            default:
                return 'text-2xl font-semibold text-gray-600 mb-2';
        }
    };

    const getDescriptionClasses = () => {
        switch (type) {
            case InfoScreenType.ERROR:
                return 'text-red-600 mb-6 max-w-md';
            case InfoScreenType.WARNING:
                return 'text-yellow-700 mb-6 max-w-md';
            case InfoScreenType.EMPTY:
                return 'text-gray-500 mb-6 max-w-md';
            default:
                return 'text-gray-500 mb-6 max-w-md';
        }
    };

    const getButtonClasses = (variant: 'primary' | 'secondary' = 'primary') => {
        const baseClasses = 'px-6 py-3 rounded-lg font-medium transition-colors duration-200';

        if (variant === 'secondary') {
            return `${baseClasses} bg-gray-200 text-gray-800 hover:bg-gray-300`;
        }

        switch (type) {
            case InfoScreenType.ERROR:
                return `${baseClasses} bg-red-600 text-white hover:bg-red-700`;
            case InfoScreenType.WARNING:
                return `${baseClasses} bg-yellow-600 text-white hover:bg-yellow-700`;
            case InfoScreenType.EMPTY:
                return `${baseClasses} bg-blue-600 text-white hover:bg-blue-700`;
            default:
                return `${baseClasses} bg-blue-600 text-white hover:bg-blue-700`;
        }
    };

    return (
        <div className={`${getContainerClasses()} ${className}`}>
            {getIcon()}

            <h2 className={getTitleClasses()}>
                {displayTitle}
            </h2>

            <p className={getDescriptionClasses()}>
                {displayDescription}
            </p>

            {actionButton && (
                <button
                    onClick={actionButton.onClick}
                    className={getButtonClasses(actionButton.variant)}
                >
                    {actionButton.text}
                </button>
            )}
        </div>
    );
};

export default InfoScreen;