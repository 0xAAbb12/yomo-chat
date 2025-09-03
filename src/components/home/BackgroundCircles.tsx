export default function BackgroundCircles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* 第一个圆圈 - 粉色 */}
      <div 
        className="absolute"
        style={{
          top: '-40%',
          left: '-25%',
          width: '974px',
          height: '974px',
          borderRadius: '974px',
          background: '#FFE3EC',
          filter: 'blur(150px)',
          zIndex: -1
        }}
      />
      
      {/* 第二个圆圈 - 蓝色 */}
      <div 
        className="absolute"
        style={{
          top: '-40%',
          left: '35%',
          width: '732px',
          height: '732px',
          borderRadius: '732px',
          background: '#E1EAFF',
          filter: 'blur(150px)',
          zIndex: -1
        }}
      />
      
      {/* 第三个圆圈 - 浅蓝色 */}
      <div 
        className="absolute"
        style={{
          top: '-50%',
          left: '55%',
          width: '732px',
          height: '732px',
          borderRadius: '732px',
          background: '#E1F9FF',
          filter: 'blur(150px)',
          zIndex: -1
        }}
      />
      
      {/* 第四个圆圈 - 浅绿色 */}
      <div 
        className="absolute"
        style={{
          top: '-45%',
          left: '80%',
          width: '732px',
          height: '732px',
          borderRadius: '732px',
          background: '#E1FFE4',
          filter: 'blur(150px)',
          zIndex: -1
        }}
      />
    </div>
  )
} 