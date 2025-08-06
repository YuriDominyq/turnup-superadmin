export default function SkeletonLoader({ height = 350 }: { height?: number }) {
    return (
        <div
            className={` min-h-[350px]:animate pulse bg-gray-200 rounded-md w-full`}
            style={{ height }}
        />
    )
}
