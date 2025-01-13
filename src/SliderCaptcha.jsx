import React, { useEffect, useState } from "react"

import "./SliderCaptcha.less"

const SliderCaptcha = ({ onLoad, onCheck }) => {
    const [bgSrc, setBgSrc] = useState()
    const [puzzleSrc, setPuzzleSrc] = useState()
    const [offset, setOffset] = useState(0)
    const [status, setStatus] = useState('ready')

    const _onLoad = () => onLoad()
        .then(r => {
            setBgSrc(r.bgSrc)
            setPuzzleSrc(r.puzzleSrc)
        })
        .catch(() => {
            setBgSrc("")
            setPuzzleSrc()
        })

    useEffect(() => { _onLoad() }, [])

    const onReload = () => {
        setBgSrc()
        setPuzzleSrc()
        _onLoad()
    }

    const _onCheck = () => {
        console.log(offset)
        if (offset < 1) { return } // 防误触

        setStatus('checking')
        onCheck(offset)
            .then(() => setStatus('ok'))
            .catch(() => setStatus('err'))
            .finally(() => setTimeout(() => {
                setOffset(0)
                setStatus('ready')
            }, 500))
    }

    return (
        <div className="slider_captcha">
            <img src={bgSrc} className="bg" />
            <img src={puzzleSrc} className="puzzle" style={{ left: offset }} />

            <a className="reload" onClick={onReload} />

            <input type="range" max="260" step="0.1"
                style={{
                    '--current-icon': `var(--${status}-icon)`,
                    '--current-color': `var(--${status}-color)`,
                    '--current-color-light': `var(--${status}-color-light)`
                }}
                disabled={!bgSrc || status !== 'ready'}
                value={offset} onChange={e => setOffset(Number(e.target.value))}
                onMouseUp={_onCheck} onTouchEnd={_onCheck}
                onKeyDown={e => e.preventDefault()}
            />
        </div>
    )
}

export default SliderCaptcha