

export default {
    parseName(name) {
        if (name[0] >= '0' && name[0] <= '9') {
            name = name.split('\n')
            return name[1]
        } else {
            return name
        }
    },

}