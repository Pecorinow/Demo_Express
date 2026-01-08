const categories = [
    {
        id : 1,
        name : "Administratif",
        icon : "📋"
    },
    {
        id : 2,
        name : "Moisit",
        icon : "🦠"
    }
]

const tasks = [
    {
        id : 1,
        name : "Demander le statut BIM",
        before : "2026-10-2",
        by : "Caroline",
        to : "FutureCaroline",
        category : 1,
        isDone : false
    },
    {
        id : 2,
        name : "Nétoyer le frigo",
        before : "2026-11-1",
        by : "Caroline",
        to : "Fenouil",
        category : 2,
        isDone : false
    }
]

module.exports = { categories, tasks }
    // Quand on a plusieurs choses à exporter, on doit créer un OBJET avec ces choses dedans.