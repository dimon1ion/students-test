import {memo, useEffect, useRef} from "react";
import {cn as bem} from '@bem-react/classname';
import './style.css';

interface ModalLayoutProps {
  children: React.ReactNode,
}

function ModalLayout(props: ModalLayoutProps) {

  const cn = bem('ModalLayout');

  // Корректировка центра, если модалка больше окна браузера.
  const layout = useRef<HTMLDivElement>(null);
  const frame = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (!(layout.current && frame.current)) {
        return;
      }
      // Центрирование frame или его прижатие к краю, если размеры больше чем у layout
      layout.current.style.alignItems = (layout.current.clientHeight < frame.current.clientHeight)
        ? 'flex-start'
        : 'center';
      layout.current.style.justifyContent = (layout.current.clientWidth < frame.current.clientWidth)
        ? 'flex-start'
        : 'center';
    });
    if (layout.current) { 
      // Следим за изменениями размеров layout
      resizeObserver.observe(layout.current);
    }
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'auto';
      resizeObserver.disconnect();
    }
  }, []);

  return (
    <div className={cn()} ref={layout}>
      <div className={cn('frame')} ref={frame}>
        <div className={cn('content')}>
          {props.children}
        </div>
      </div>
    </div>
  );
}

export default memo(ModalLayout);
