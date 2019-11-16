import React, { forwardRef, ForwardRefExoticComponent } from 'react';
import Slide from '@material-ui/core/Slide';
import { TransitionProps } from '@material-ui/core/transitions';

interface ProductsTransitionProps { }

const ProductsTransition:(
  ForwardRefExoticComponent<ProductsTransitionProps>) = forwardRef<unknown, TransitionProps>(
  (props, ref) => {
    const {
      appear,
      children,
      onEnter,
      onEntered,
      onEntering,
      onExit,
      onExited,
      onExiting,
      timeout,
    } = props;

    return (
      <Slide
        direction="up"
        ref={ref}
        appear={appear}
        in={props.in}
        onEnter={onEnter}
        onEntering={onEntering}
        onEntered={onEntered}
        onExit={onExit}
        onExiting={onExiting}
        onExited={onExited}
        timeout={timeout}
      >
        {children}
      </Slide>
    );
  },
);

export default ProductsTransition;
