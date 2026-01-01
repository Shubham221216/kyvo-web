import { SkeletonTheme } from 'react-loading-skeleton'
import brandColors from '../../theme/brandColors'

const SkeletonProvider = ({ children }) => {
  return (
    <SkeletonTheme baseColor={brandColors.border} highlightColor={brandColors.surfaceTint}>
      {children}
    </SkeletonTheme>
  )
}

export default SkeletonProvider
