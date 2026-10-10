import deleteIcon from "../../../../images/icons/deleteIcon.svg"


export const TransactionTable = () => {

    return (
         <table>
              <tr>
                 <th>дата</th>
                 <th>опис</th>
                 <th>категорія</th>
                 <th>сума</th>
             </tr>
             <tr>
                 <td>05.09.2019</td>
                 <td>Метро</td>
                 <td>Транспорт</td>
                 <td>- 30.00 грн.</td>
                 <td>
                    <button>
                          <img src={deleteIcon} alt="delete" />  
                    </button>
                 </td>
             </tr>
            </table>
    )
}