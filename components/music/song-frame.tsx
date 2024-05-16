const SongIFrame = ({ url }: { url: string }) => {
  return (
    <div style={{ width: '100%', height: '100vh', border: 'none' }}>
      <iframe
        src={url}
        width="100%"
        height="100%"
        style={{ border: 'none' }}
        title="Song IFrame"
        allowFullScreen
      ></iframe>
    </div>
  )
}

export default SongIFrame
