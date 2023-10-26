const PAYMENT_METHOD_MELI = "MercadoPagoNew"

/* Aplica un filtro */
function Where(operations, filterCallback){
    return operations.filter(op => {
        return filterCallback(op)
    });
}

/* Genera una lista de operations solo con los campos seleccionados en la lista keys */
function Select(operations, keys) {

    const extraerValores = (objeto, clave) => {
        let resultados = {};
    
        for (let i in objeto) {
            if (i === clave) {
                resultados[clave] = objeto[i];
            }
            if (objeto[i] !== null && typeof(objeto[i])=="object") {
                Object.assign(resultados, extraerValores(objeto[i], clave));
            }
        }
    
        return resultados;
    }

    const newOperationList = []

    operations.map( (op, i) => {
        let operationProjected = {};

        keys.forEach(k => {
            tmp = extraerValores(op, k)
            Object.assign(operationProjected, tmp)
        });

        newOperationList.push(operationProjected)
    })

    return newOperationList
}

/* Lista de callbacks con filtros para lista de operaciones */
const MethodFilter = (methodName) => (operation) => operation.adv.tradeMethods.some( method => method.identifier === methodName )

module.exports = {
    Where,
    Select,
    MethodFilter,
    PAYMENT_METHOD_MELI
}