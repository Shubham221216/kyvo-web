import { FiActivity, FiBox, FiCpu, FiLayers, FiSettings, FiTool } from 'react-icons/fi'
import brandColors from '../../theme/brandColors'

const GridBackground = () => {
  const hexToRgba = (hex, alpha) => {
    const normalized = hex.replace('#', '')
    const full =
      normalized.length === 3 ? normalized.split('').map((c) => c + c).join('') : normalized
    const r = Number.parseInt(full.slice(0, 2), 16)
    const g = Number.parseInt(full.slice(2, 4), 16)
    const b = Number.parseInt(full.slice(4, 6), 16)
    return `rgba(${r}, ${g}, ${b}, ${alpha})`
  }

  return (
    <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${brandColors.gridLine} 1px, transparent 1px), linear-gradient(90deg, ${brandColors.gridLine} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
          opacity: 0.85,
        }}
      />

      <div
        className="absolute top-[10%] left-[5%]"
        style={{ color: hexToRgba(brandColors.primaryHover, 0.18) }}
      >
        <FiSettings size={48} />
      </div>
      <div
        className="absolute top-[15%] right-[10%]"
        style={{ color: hexToRgba(brandColors.primaryHover, 0.18) }}
      >
        <FiTool size={40} />
      </div>
      <div
        className="absolute top-[40%] left-[15%]"
        style={{ color: hexToRgba(brandColors.primaryHover, 0.14) }}
      >
        <FiCpu size={56} />
      </div>
      <div
        className="absolute top-[60%] right-[5%]"
        style={{ color: hexToRgba(brandColors.primaryHover, 0.18) }}
      >
        <FiLayers size={48} />
      </div>
      <div
        className="absolute bottom-[15%] left-[8%]"
        style={{ color: hexToRgba(brandColors.primaryHover, 0.14) }}
      >
        <FiBox size={44} />
      </div>
      <div
        className="absolute bottom-[20%] right-[15%]"
        style={{ color: hexToRgba(brandColors.primaryHover, 0.18) }}
      >
        <FiActivity size={52} />
      </div>

      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `linear-gradient(${hexToRgba(brandColors.surface, 0.25)}, transparent, ${hexToRgba(brandColors.surface, 0.25)})`,
        }}
      />
    </div>
  )
}

export default GridBackground
