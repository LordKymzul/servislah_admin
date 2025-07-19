const LoadingScreen = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-foreground"></div>
            <p className="text-sm text-muted-foreground mt-2">Please wait while we load the page...</p>
        </div>
    )
}

export default LoadingScreen;