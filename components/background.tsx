const imageUrl = `/bg.png`

export function Background() {
  return <div className=" backdrop-blur-sm" />
}

const styles: { [key: string]: React.CSSProperties } = {
  backgroundMain: {
    width: '100vw',
    minHeight: '100vh',
    position: 'fixed',
    zIndex: 1,
    display: 'flex',
    justifyContent: 'center',
    padding: '120px 24px 160px 24px',
    pointerEvents: 'none',
    backgroundImage: `url(${imageUrl})`,
    backgroundSize: 'cover', // Ensures the background image covers the entire area
    backgroundRepeat: 'no-repeat', // Prevents the background image from repeating
    backgroundPosition: 'center' // Centers the background image
  }
}
