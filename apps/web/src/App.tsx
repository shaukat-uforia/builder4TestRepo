import { Editor, Frame, Element } from "@craftjs/core";
import { useNode } from "@craftjs/core";
import "./index.css"
import {useState,useEffect,useRef} from "react";
export const Button = () => {
    const { connectors: { connect, drag } } = useNode();

    return (
        <button ref={ref => connect(drag(ref))} className="bg-blue-500 text-white px-4 py-2 rounded">
            Click me
        </button>
    );
};

Button.craft = {
    displayName: "Button",
};

export default function App() {
    const [scale,setScale]=useState(1)
    const [translateX,setTranslateX]=useState(0)
    const [translateY,setTranslateY]=useState(0)
    const frameRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const SCROLL_SPEED = 1.5;
        const ZOOM_SPEED = 0.001;

        const handleWheel = (e: WheelEvent) => {
            e.preventDefault();

            if (e.ctrlKey) {
                // Zoom in/out
                setScale(prev => {
                    const newScale = prev - e.deltaY * ZOOM_SPEED;
                    return Math.min(5, Math.max(0.1, newScale)); // clamp zoom
                });
            } else if (e.altKey) {
                // Pan vertically
                setTranslateY(prev => prev - e.deltaY * SCROLL_SPEED);
            } else {
                // Pan horizontally
                setTranslateX(prev => prev - e.deltaY * SCROLL_SPEED);
            }
        };

        const el = frameRef.current;
        if (el) {
            el.addEventListener('wheel', handleWheel, { passive: false });
        }

        return () => {
            if (el) {
                el.removeEventListener('wheel', handleWheel);
            }
        };
    }, []);
    const [isPanningMode, setIsPanningMode] = useState(false);
    const isDragging = useRef(false);
    const startX = useRef(0);
    const startY = useRef(0);
    const originX = useRef(0);
    const originY = useRef(0);

    const translateXRef = useRef(translateX);
    const translateYRef = useRef(translateY);
    useEffect(() => { translateXRef.current = translateX; }, [translateX]);
    useEffect(() => { translateYRef.current = translateY; }, [translateY]);
    useEffect(() => {
        const frame = frameRef.current;
        if (!frame) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.code === 'Space') {
                e.preventDefault();
                setIsPanningMode(true);
                document.body.style.cursor = 'grab';
            }
        };

        const handleKeyUp = (e: KeyboardEvent) => {
            if (e.code === 'Space') {
                setIsPanningMode(false);
                document.body.style.cursor = 'default';
            }
        };

        const handleMouseDown = (e: MouseEvent) => {
            if (!isPanningMode || e.button !== 0) return;

            e.preventDefault();
            isDragging.current = true;
            startX.current = e.clientX;
            startY.current = e.clientY;
            originX.current = translateXRef.current;
            originY.current = translateYRef.current;

            document.body.style.cursor = 'grabbing';

            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        };

        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging.current) return;

            const dx = e.clientX - startX.current;
            const dy = e.clientY - startY.current;

            setTranslateX(originX.current + dx);
            setTranslateY(originY.current + dy);
        };

        const handleMouseUp = () => {
            isDragging.current = false;
            document.body.style.cursor = isPanningMode ? 'grab' : 'default';

            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };

        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('keyup', handleKeyUp);
        frame.addEventListener('mousedown', handleMouseDown);

        return () => {
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('keyup', handleKeyUp);
            frame.removeEventListener('mousedown', handleMouseDown);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isPanningMode]);

    return (
        <Editor resolver={{ Button }}>
            <div className={'relative flex h-[90vh]'}>
                <div className={'absolute z-[10] w-[200px] h-full bg-[#fff]'}>
                     <div>Left panel</div>
                </div>
                <div ref={frameRef} className={'border flex-grow bg-[#454545] flex items-center justify-center overflow-hidden'}>
                    <div  style={{width:500,height:200,scale,transform:`translate(${translateX}px,${translateY}px)`}} className={'frame-which-has-elements border rounded border-solid bg-[#ffffff]  '} >
                        <Frame>
                            <Element is="div" canvas>
                                <div>Editable Area</div>
                                <Button />
                            </Element>
                        </Frame>
                    </div>
                </div>
                <div style={{right:0}} className={'z-[10] absolute w-[200px] h-full right-0 top-right bg-[#ffffff00]'}>
                    <div>Right Panel</div>
                    <div className={'flex flex-col'}>
                        <label htmlFor="range">Zoom</label>
                        <input type="range" step={0.1} min={0.1} max={5} value={scale} id={'range'} onChange={({target:{value}})=>{setScale(value)}}/>
                    </div>
                </div>
            </div>


        </Editor>
    );
}
