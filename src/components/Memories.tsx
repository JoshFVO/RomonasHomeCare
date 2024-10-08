import { HTMLAttributes, useEffect, useRef, useState } from "react";
import MaxWidthWrapper from "./MaxWidthWrapper";
import { useInView } from "framer-motion";
import { cn } from "@/lib/utils";

const MEMPHOTOS = [
    "/memories/memory_1.jpeg",
    "/memories/memory_2.jpeg",
    "/memories/memory_3.jpeg",
    "/memories/memory_4.jpeg",
    "/memories/memory_5.jpeg",
    "/memories/memory_6.JPG"
]

function splitArray<T>(array: Array<T>, numParts: number) {
    const result: Array<Array<T>> = []
  
    for (let i = 0; i < array.length; i++) {
      const index = i % numParts
      if (!result[index]) {
        result[index] = []
      }
      result[index].push(array[i])
    }
  
    return result
  }

function MemoryColumn({
    memories,
    className,
    memoryClassName,
    msPerPixel = 0
}: {
    memories: string[]
    className?: string
    memoryClassName?: (memoryIndex: number) => string
    msPerPixel?: number
}) {
    const columnRef = useRef<HTMLDivElement | null>(null)
    const [columnHeight, setColumnHeight] = useState(0)
    const duration = `${columnHeight * msPerPixel}ms`

    useEffect(() => {
        if(!columnRef.current) return

        const resizeObserver = new window.ResizeObserver(() => {
            setColumnHeight(columnRef.current?.offsetHeight ?? 0)
        })

        resizeObserver.observe(columnRef.current)

        return () => {
            resizeObserver.disconnect()
        }
    }, [])

    return (
    <div 
    ref={columnRef} 
    className={cn("animate-marquee space-y-8 py-4", className)}
    style={{'--marquee-duration': duration} as React.CSSProperties}>
        {memories.concat(memories).map((imgSrc, memoryIndex) => (
            <Memory key={memoryIndex} className={memoryClassName?.(memoryIndex % memories.length)}
            imgSrc={imgSrc}/>
        ))}
    </div>
)
}

interface MemoryProps extends HTMLAttributes<HTMLDivElement> {
    imgSrc: string
}
function Memory({imgSrc, className, ...props}: MemoryProps) {

    const POSSIBLE_ANIMATION_DELAYS = ['0s', '0.1s', '0.2s', '0.3s', '0.4s', '0.5s']

    const animationDelay = POSSIBLE_ANIMATION_DELAYS[Math.floor(Math.random() * POSSIBLE_ANIMATION_DELAYS.length)]
    return <div 
    className={cn('animate-fade-in rounded-[0.5rem] bg-white p-6 opacity-0 shadow-xl shadow-slate-900/5', 
        className
    )} 
    style={{animationDelay}}
    {...props}>
        <img src={imgSrc} />
    </div>

}

function MemoryGrid() {
    const containerRef = useRef<HTMLDivElement | null>(null)

    const isInView = useInView(containerRef, {once: true, amount: 0.4})

    const columns = splitArray(MEMPHOTOS, 3)

    const column1 = columns[0]
    const column2 = columns[1]
    const column3 = splitArray(columns[2], 2)

    return (
    <div ref={containerRef} className="relative -mx-4 mt-16 grid h-[49rem] max-h-[150vh] grid-cols-1 items-start gap-8 overflow-hidden px-4 sm:mt-20 md:grid-cols-2 lg:grid-cols-3">
        {isInView ? <>
        <MemoryColumn memories={[...column1, ...column3.flat(), ...column2]}
        memoryClassName={(memoryIndex) => cn({
            "md:hidden": memoryIndex >= column1.length + column3[0].length,
            "lg:hidden": memoryIndex >= column1.length, 
        })}
        msPerPixel={10}
        />
        <MemoryColumn memories={[...column2, ...column3[1]]}
        className="hidden md:block"
        memoryClassName={(memoryIndex) => memoryIndex >= column2.length ? 'lg:hidden': ''}
        msPerPixel={15}
        />
        <MemoryColumn memories={column3.flat()}
        className="hidden md:block"
        msPerPixel={10}
        />
        </> : null}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-slate-100"/>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-slate-100"/>
        </div>
)
}

export function Memories() {
    return (
        <MaxWidthWrapper className="relative max-w-5xl">
            <MemoryGrid />
        </MaxWidthWrapper>
    )
}