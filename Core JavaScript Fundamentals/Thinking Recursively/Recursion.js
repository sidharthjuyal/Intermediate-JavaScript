let user = {
    name: "Sid",
    address: {
        personal: {
            city: "Kotdwar",
            area: "Majra"
        },
        Office: {
            city: "Gurgaon",
            area: {
                landmark: "Ambience Mall"
            }
        }
    }
};

let final_obj = {};

let magic = (obj, parent) => {
    for( let key in obj ) {
        if (typeof(obj[key]) === 'object') {
             magic(obj[key], parent + "_" + key);
        } else {
            final_obj[parent + "_" + key] = obj[key];
        }
    }
    console.log(final_obj);
}

magic(user, "user");