'use strict'

const controller = {};
var consult = [];
var val = [];




controller.prueba = (req , res)  =>{
    req.getConnection((err, conn) => {
            conn.query("select PERMISSAO_SISTEMA.co_usuario  as name "+ 
        "from CAO_USUARIO inner join PERMISSAO_SISTEMA "+
        "on CAO_USUARIO.co_usuario = PERMISSAO_SISTEMA.co_usuario "+
        "and PERMISSAO_SISTEMA.co_sistema = 1 "+
        "and PERMISSAO_SISTEMA.IN_ATIVO = 'S' "+
        "and PERMISSAO_SISTEMA.CO_TIPO_USUARIO in ( 0,1, 2)  "+
        "order by PERMISSAO_SISTEMA.co_usuario asc;", (err, consutores) => {
                        if (err) {
                            res.json(err);
                        }
                        this.consult = JSON.stringify(consutores);
                        for (var i = 0;i < consutores.length; i++) {
                            consult.push({name: consutores[i].name});
                        }
                           res.status(200).send(
                               JSON.parse(this.consult)
                        ) ;
                    });
            })
}




controller.Rotatorio = async(req, res) =>{
    console.log('llegando a rotatorio');
    let values = req.body;
    // let year_in = req.body.year_in.replace(/"/g, "'").toString();
    // let month_in = req.body.month_in.replace(/"/g, "'").toString();
    // let year_to = req.body.year_to.replace(/"/g, "'").toString();
    // let month_to = req.body.month_to.replace(/"/g, "'").toString();
    
  
    // var params = [ values.params.replace(/"/g, "'").toString() ]
    console.log(values);
    console.log(values.b);
    
        req.getConnection((err, conn) => {
            console.log('1');
            conn.query("select Year(CAO_FATURA.data_emissao) as year,  Month(CAO_FATURA.data_emissao)  as mes, CAO_OS.co_usuario as consultor, "+
                       "sum(round(CAO_FATURA.valor - (CAO_FATURA.valor * (cao_fatura.TOTAL_IMP_INC /100)))) as total, "+
                       "sum(CAO_SALARIO.brut_salario) as salario, "+
                       "round((sum(CAO_FATURA.valor - (CAO_FATURA.valor * cao_fatura.TOTAL_IMP_INC )) * sum(CAO_FATURA.COMISSAO_CN)))   as comissao, "+
                       "round((sum(CAO_FATURA.valor - (CAO_FATURA.valor * (cao_fatura.TOTAL_IMP_INC /100)))) - (CAO_SALARIO.brut_salario + (sum(CAO_FATURA.valor - (CAO_FATURA.valor * cao_fatura.TOTAL_IMP_INC )) * sum(CAO_FATURA.COMISSAO_CN)))) as lucro "+
                       "from CAO_FATURA  inner join  CAO_OS on cao_os.co_sistema = CAO_FATURA.co_sistema "+
                       "inner join CAO_SALARIO on CAO_SALARIO.co_usuario = CAO_OS.co_usuario "+
                       "and CAO_OS.co_usuario =  ( ? ) "+
                       "where (EXTRACT( YEAR_MONTH FROM CAO_FATURA.data_emissao) between concat( (?)   , (?) ) and  concat(  (?)  ,  (?)   )) "+
                       "group by Month(CAO_FATURA.data_emissao),CAO_OS.co_usuario,CAO_SALARIO.brut_salario,Year(CAO_FATURA.data_emissao) "+ 
                       "order by CAO_OS.co_usuario asc, Month(CAO_FATURA.data_emissao);" , [values.a, values.b, values.c, values.d, values.e], (err, data) => {

                            if (err) {
                                res.json(err);
                                console.log(err)

                            }
                           this.val = console.log(JSON.stringify(data));

                        //     this.consult = JSON.stringify(values);
                             
    
                            res.send({ 
                               data 
                            }) ;
                                    
                           
                        })
 })
}
// controller.custo_fixo = async(req, res) =>{
//     console.log('llegando a custo_fixo');
//     let values = req.body;
//     console.log(values);
    
//         req.getConnection((err, conn) => {
//             console.log('1');
//             conn.query("select brut_salario as custo_fixo, co_usuario "+
//             "from CAO_SALARIO where co_usuario in ( ? );" , [values], (err, lucro) => {
//                             if (err) {
//                                 res.json(err);
//                                 console.log(err)

//                             }
//                             console.log(lucro);

//                         //     this.consult = JSON.stringify(values);
//                         //     console.log(this.values);
    
//                             res.status(200).send(
//                                 lucro
//                          ) ;
//                         })
//  })
// }
// controller.Comissao = async(req, res) =>{
//     console.log('llegando a comissao');
//     let values = req.body;
//     console.log(values);
//         req.getConnection((err, conn) => {
//             console.log('1');
//             conn.query("select  (sum(CAO_FATURA.valor - (CAO_FATURA.valor * (CAO_FATURA.valor * cao_fatura.TOTAL_IMP_INC ))) * sum(CAO_FATURA.COMISSAO_CN))   as comissao, CAO_OS.co_usuario "+
//                             "from CAO_FATURA  inner join  CAO_OS on cao_os.co_sistema = CAO_FATURA.co_sistema "+
//                             "and CAO_OS.co_usuario in  ( ? ) "+
//                             "and Month(CAO_FATURA.data_emissao) = 01 and Year(CAO_FATURA.data_emissao) = 2007 "+
//                             "group by  CAO_OS.co_usuario;" , [values], (err, comissao) => {
//                                 if (err) {
//                                     res.json(err);
//                                     console.log(err)
//                                 }
//                                 console.log(comissao);
//                             //     this.consult = JSON.stringify(values);
//                             //     console.log(this.values);
        
//                                 res.status(200).send(
//                                     comissao
//                                 ) ;
//             })
//         })
// }


module.exports = controller;