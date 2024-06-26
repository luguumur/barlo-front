const CustomIcon = ({...props}) => {
    return <i style={props.style} className={`${props.icon} ${props.className}`} />;
};

export default CustomIcon;