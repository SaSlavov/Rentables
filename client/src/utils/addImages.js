export const addImages = (event, images, setImages) => {

    var files = event.target.files; 
    const result = []

    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        if (!file.type.match('image')) {
            continue;
        }

        let picReader = new FileReader();
        picReader.onload = (e) => {
            const picFile = e.target;
            result.push(picFile)
            setImages([...images, ...result])
        };
        
        picReader.readAsDataURL(file);
    }

};