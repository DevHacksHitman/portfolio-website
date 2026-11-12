import { useProgress } from '@react-three/drei'

/**
 * Plain-DOM loading overlay for the hero canvas.
 *
 * It deliberately lives OUTSIDE the R3F tree. Inside the Canvas's Suspense
 * boundary, the useProgress store subscription updated while another component
 * was rendering, which React reports as "Cannot update a component while
 * rendering a different component" (16 errors on canvas load).
 */
const CanvasLoader = () => {
    const { progress, active } = useProgress()

    if (!active) return null

    return (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center bg-black/40">
            <span className="block h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />
            <p className="mt-10 text-sm font-extrabold text-[#F1F1F1]">
                {progress !== 0 ? `${progress.toFixed(2)}%` : 'Loading...'}
            </p>
        </div>
    )
}

export default CanvasLoader
