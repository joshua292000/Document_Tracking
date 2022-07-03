export class PhotoService {

    getImages() {
        return fetch("photos.json",{
            headers : { 
              'Content-Type': 'application/json',
              'Accept': 'application/json'
             }
          })
        .then(res => res.json())
        .then(d => d.data);
    }
}