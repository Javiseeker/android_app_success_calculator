import CSS from 'csstype';

interface ImageProps {
    imgSrc: string;
    altPath: string;
    onClickUrl: string;
    style: CSS.Properties;
    onClickEnabled: boolean;
}

const Image : React.FC<ImageProps> = ({imgSrc, altPath, onClickUrl, style, onClickEnabled }: ImageProps) => {
    const openInNewTab = (url: string) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
        if (newWindow) newWindow.opener = null
      }

    return onClickEnabled?
        <img src={imgSrc} style={style} alt={altPath} onClick={() => openInNewTab(onClickUrl)}/>:
        <img src={imgSrc} style={style} alt={altPath}/>;

};

export default Image;