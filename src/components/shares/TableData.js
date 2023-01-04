function TableData(props) {
    return (
        <table className="table table-striped table-hover">
            <thead>
            <tr>
                {props.columns.map((column,index) => (
                    <th key={index}>{column.headerName}</th>
                ))}
            </tr>
            </thead>
            <tbody>
            {props.rows.map((row,index) => (
                <tr key={index}>
                    <td style={{display: props.isCheckBox ? 'block' : 'none'}}>
                        <input type="checkbox"/>
                    </td>
                    {Object.keys(row).map((keyObject,index) => (
                        (typeof row[keyObject] == 'boolean')
                            ?
                            <td>
                                { row[keyObject] ? 'Active' : 'Disable' }
                            </td>
                            : <td key={index}>{row[keyObject]}</td>

                    ))}
                </tr>
            ))}
            </tbody>
        </table>
    )
}

export default TableData;
