import React, { createContext, useState } from 'react'
import classNames from 'classnames'
import { MenuItemProps } from './MenuItem'

// 字符串字面量联合类型，等同于使用枚举
type MenuMode = 'horizontal' | 'vertical'
type SelectedCallback = (selectedIndex: string) => void

// 定义父组件向子组件传递的数据接口
interface IMenuContext {
  activeIndex: string;
  // 用于在选取菜单子项后用户自定义的逻辑
  onSeleted?: SelectedCallback;
  mode: MenuMode;
  defaultOpenedSubMenus?: string[];
}

export interface MenuProps {
  /**
   * 默认选中的菜单项索引
   */
  defaultIndex?: string;
  /**
   * 自定义的class类名
   */
  className?: string;
  /**
   * 菜单项的展示方向：horizontal表示横向，vertical表示纵向
   */
  mode?: MenuMode;
  /**
   * 自定义的style属性，用于添加样式
   */
  style?: React.CSSProperties;
  /**
   * 选中菜单项时的回调函数
   */
  onSelected?: SelectedCallback;
  /**
   * 如果有二级菜单，默认打开的二级菜单项索引，如['3']表示索引为3的二级菜单应该默认打开
   */
  defaultOpenedSubMenus?: string[];
}

export const MenuContext = createContext<IMenuContext>({ activeIndex: '0', mode: 'horizontal' })

/**
 * 
 * 
 * ### 引入形式
 * ~~~js
 * // ESModule
 * import { Menu } from 'mxyrc'
 * ~~~
 * ### 简介
 * Menu组件，用于展示一系列可供选择的菜单项，并且支持二级菜单项的定义
 * @param props 
 */
const Menu: React.FC<MenuProps> = (props) => {
  const { className, mode, style, defaultIndex, children, onSelected, defaultOpenedSubMenus } = props;
  const [ currentActive, setActive ] = useState(defaultIndex)
  const classes = classNames('menu', className, {
    'menu-vertical': mode === 'vertical',
    'menu-horizontal': mode !== 'vertical'
  })
  const handleClick = (selectedIndex: string) => {
    setActive(selectedIndex)
    onSelected && onSelected(selectedIndex)
  }
  const passedContext: IMenuContext = {
    activeIndex: currentActive? currentActive: '0',
    onSeleted: handleClick,
    mode: mode === 'vertical'? 'vertical': 'horizontal',
    defaultOpenedSubMenus
  }
  const renderChildren = () => {
    return React.Children.map(children, (child, index) => {
    //   这里使用React.FunctionComponentElement类型的原因：
    //   interface FunctionComponentElement<P> extends ReactElement<P, FunctionComponent<P>>
    //   interface ReactElement<P = any, T extends 很长> {
    //     type: T;
    //     props: P;
    //     key: Key | null;
    //   }
    //   显然，FunctionComponentElement是函数组件调用返回的React Element类型，其中的type属性值就是该FunctionComponent
    // 由于child的类型是各种类型的联合类型，所以这里使用了断言来确定类型，
    // 这里使用类型断言主要是为了不出现类型错误，实际上，任何的React Element类型都由一个type属性，
    // 所以可以从childElement.type中获取displayName，除了组件（被定义了displayName）外，
    // 其他React Element的type属性的displayName属性为undefined.  
    const childElement = child as React.FunctionComponentElement<MenuItemProps>
      const { displayName } = childElement.type
      if (displayName === 'MenuItem' || displayName === 'SubMenu') {
        return React.cloneElement(childElement, { index: index.toString() })
      } else {
        console.error('Warning: Menu has a child which is not a MenuItem Component')
      }
    })
  }
  return (
    <ul
      className={classes}
      style={style}
      data-testid={'test-menu'}
    >
      <MenuContext.Provider value={passedContext}>
        { renderChildren() }
      </MenuContext.Provider>
    </ul>
  )
}

Menu.defaultProps = {
  defaultIndex: '0',
  mode: 'horizontal',
  defaultOpenedSubMenus: []
}

Menu.displayName = 'Menu'

export default Menu