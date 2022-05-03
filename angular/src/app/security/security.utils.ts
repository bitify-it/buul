export class SecUtils
{
    static readonly authMap = new Map([
        [ "CREATE", "_create" ],
        [ "UPDATE", "_update" ],
        [ "DELETE", "_delete" ],
        [ "DELETE_ALL", "_delete_all" ],
        [ "BY_ID", "_by_id" ],
        [ "LIST", "_list_all" ],
        [ "LIST_PAGED", "_list_paged" ],
        [ "REPORT_CSV", "_report_csv" ],
        [ "REPORT_PDF", "_report_pdf" ],
        [ "REPORT_XLS", "_report_xls" ],
    ]);
    
};
