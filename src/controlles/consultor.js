'use strict'

const controller = {};
var consult = [];
var val = [];




controller.prueba = (req , res)  =>{
    req.getConnection((err, conn) => {
            conn.query("select us.co_usuario as name "+
                        "from cao_usuario us inner join permissao_sistema p "+
                        "on us.co_usuario = p.co_usuario "+
                        "and p.co_sistema = 1 "+
                        "and p.IN_ATIVO = 'S' "+
                        "and p.CO_TIPO_USUARIO in ( 0,1, 2) "+
                        "order by p.co_usuario asc;", (err, consutores) => {
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

    console.log(values);
    console.log(values.b);

        req.getConnection((err, conn) => {
            // console.log('1');
            conn.query("select Year(f.data_emissao) as year,  Month(f.data_emissao)  as mes, c.co_usuario as consultor, "+
                       "sum(round(f.valor - (f.valor * (f.TOTAL_IMP_INC /100)))) as total, "+
                       "sum(s.brut_salario) as salario, "+
                       "round((sum(f.valor - (f.valor * f.TOTAL_IMP_INC )) * sum(f.COMISSAO_CN)))   as comissao, "+
                       "round((sum(f.valor - (f.valor * (f.TOTAL_IMP_INC /100)))) - (s.brut_salario + (sum(f.valor - (f.valor * f.TOTAL_IMP_INC )) * sum(f.COMISSAO_CN)))) as lucro "+
                       "from cao_fatura f inner join  cao_os c on c.co_sistema = f.co_sistema "+
                       "inner join cao_salario s on s.co_usuario = c.co_usuario "+
                       "and c.co_usuario = ( ? ) "+
                       "where (EXTRACT( YEAR_MONTH FROM f.data_emissao) between  concat( (?)   , (?) ) and  concat(  (?)  ,  (?)   )) "+
                       "group by Month(f.data_emissao),c.co_usuario,s.brut_salario,Year(f.data_emissao) "+
                       "order by c.co_usuario asc, Month(f.data_emissao);" , [values.a, values.b, values.c, values.d, values.e], (err, data) => {

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
