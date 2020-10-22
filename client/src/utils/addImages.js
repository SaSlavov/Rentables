export const addImages = (event, images, setImages) => {

    var files = event.target.files; 

    for (let i = 0; i < files.length; i++) {
        let file = files[i];

        if (!file.type.match('image')) {
            continue;
        }

        let picReader = new FileReader();
        picReader.onload = (event) => {
            const picFile = event.target;
            setImages([...images, picFile])

        };

        picReader.readAsDataURL(file);
    }

};