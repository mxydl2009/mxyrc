import React from 'react'
import classNames from 'classnames'

// 使用枚举类型来定义Button的size和type有哪些属性值，因为这些属性值都是一些固定的常量
export enum ButtonSize {
  Large = 'lg',
  Small = 'sm'
}

export enum ButtonType {
  Primary = 'primary',
  Default = 'default',
  Danger = 'danger',
  Link = 'link'
}

// 创建Button组件props的形状
interface BaseButtonProps {
  className?: string;
  disabled?: boolean;
  size?: ButtonSize;
  btnType?: ButtonType;
  href?: string;
  children: React.ReactNode;
}

// 定义NativeButtonProps 类型别名，将React本身提供的ButtonHTMLAttribute类型与BaseButtonProps合并为交叉类型
type NativeButtonProps = BaseButtonProps & React.ButtonHTMLAttributes<HTMLElement>;

type AnchorButtonProps = BaseButtonProps & React.AnchorHTMLAttributes<HTMLElement>;

// Utility Types: Partial<T>将T上所有的属性变为可选的，因为NativeButtonProps的必须属性不属于AnchorButtonProps的属性，所以直接将所有属性变为可选的；
export type ButtonProps = Partial<NativeButtonProps & AnchorButtonProps>;

const Button: React.FC<ButtonProps> = (props) => {
  const { btnType, className, disabled, size, href, children, ...restProps } = props;
  // 使用classNames来添加className
  // 当前元素的className除了包含btn外，还会通过type来指定类型，如btn-primary, 以及btn-size，如果是link类型，需要添加
  // disabled className
  const classes = classNames('btn', className, {
    // 如果btnType存在，则添加了btn-${btnType}
    [`btn-${btnType}`]: btnType,
    [`btn-${size}`]: size,
    disabled: btnType === ButtonType.Link ? disabled: false
  });
  if (btnType === ButtonType.Link && href) {
    // 如果是link类型且传入了href属性，则返回a元素
    return (
      <a
        className={classes}
        href={href}
        {...restProps}
      >
        {children}
      </a>
    )
  } else {
    return (
      <button
        className={classes}
        disabled={disabled}
        {...restProps}
      >
        {children}
      </button>
    )
  }
}

Button.defaultProps = {
  disabled: false,
  btnType: ButtonType.Default
}

export default Button