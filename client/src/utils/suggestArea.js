export const suggestArea = (characters) => {
    return areas.filter(area => {
        area = area.toLowerCase()
        return area.startsWith(characters.toLowerCase())
    })
}


const areas = [
    'Briz',
    'Levski',
    'Vuzrajdane 1',
    'Vuzrajdane 2',
    'Vuzrajdane 3',
    'Vuzrajdane 4',
    'Mladost 1',
    'Mladost 2',
    'Kaisieva Gradina',
    'Chataldja',
    'Lyatno Kino Trakiya',
    'Zimno Kino Trakiya',
    'Neptun',
    'Cherven Ploshtad',
    'Izgrev',
    'Troshevo',
    'Kolhozen pazar',
    'VINS',
    'Centur',
    'Asparuhovo',
    'Galata',
]