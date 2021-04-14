import CSS from 'csstype';

interface ImageProps {
    readonly imgSrc: string;
    readonly altPath: string;
    readonly onClickUrl: string;
    readonly style: CSS.Properties;
    readonly onClickEnabled: boolean;
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