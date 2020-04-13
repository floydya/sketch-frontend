import React, { useRef, useEffect, useState } from 'react'
import ReactDOM from 'react-dom'

interface IPortal {
  selector: string
  children: React.ReactNode
}

const Portal: React.FC<IPortal> = ({ selector, children }) => {
  const ref = useRef(null)
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    ref.current = document.querySelector(selector)
    setMounted(true)
  }, [])
  if (!ref.current || !mounted) return null
  return ReactDOM.createPortal(children, ref.current)
}

export default Portal
