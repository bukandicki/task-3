$(document).ready(function () {

    var total_cart = 0;
    
    $(".beli").click(function (e) {
        e.preventDefault();
        
        $('#product-cart').addClass('show');
        $('#emptycart').css('display', 'none');
        
        var id = $(this).attr('id'),
            price = $('.beli#' + id).closest('tr').find("input.product-price").val(),
            cart_item = $('#cart').find('tr[data-cart-item="'+id+'"]').length;
            total_cart += parseInt(GetInfoProduct('product-price'))

        $("#total-price").attr("data-grand-total", total_cart)
        $("#total-price").text('Rp'+total_cart)

        
        function Numbering($table)
        {
            var no = -1;
            $table.find("tr").each(function (index, element) {
                numbering = no++;
                $('#cart').find('tr[data-cart-item="' + id + '"]').find("button.hapus").attr("id","a"+id)    
                $(element).find("span.no").html(numbering);
            });
        }
        
        function Quantity()
        {
            var qty = $('#cart').find('[data-cart-item="' + id + '"').find('input.qty'+id).val();
            quantity = parseInt(qty)+1
            return quantity
        }

        function TotalingRow()
        {
            var qty = $('#cart').find('[data-cart-item="' + id + '"').find('input.qty' + id).val();
            var sum = $(".total" + id).html("Rp" + parseInt(price) * parseInt(qty));
            $(".total" + id).attr("data-price-total", parseInt(price) * parseInt(qty));
            return sum
        }

        function GetInfoProduct(inputClassName)
        {
            var record = $('.beli#' + id).closest('tr').find("input." + inputClassName).val();
            return record
        }

        function CreateNewRow()
        {
            var appendTD = '<tr data-cart-item="' + GetInfoProduct('product-id') + '">' +
                                '<td><span class="no"></span></td>' +
                                '<td><span class="productcode">' + GetInfoProduct('product-id') + '</span></td>' +
                                '<td><span class="productname">' + GetInfoProduct('product-name') + '</span></td>' +
                                '<td><span class="productprice">Rp' + GetInfoProduct('product-price') + '</span></td>' +
                                '<td>' +
                                    '<label class="qty' + GetInfoProduct('product-id') + '"></label>' +
                                    '<input class="qty' + GetInfoProduct('product-id') + '" type="hidden" value="0">' +
                                '</td>' +
                                '<td>' +
                                    '<label class="total total' + id + '" data-price-total=""></label>' +
                                '</td>' +
                                '<td><button class="hapus" id="">HAPUS</button></td>' +
                            '</tr>'
                ;
            var appendSpan = $('#cart').append(appendTD);
            return appendSpan
        }
        
        if (cart_item == 0)
        {
            CreateNewRow('product-id');
            $('.qty' + id).text(Quantity() + " pcs");
            $('.qty'+id).val(Quantity());
            Numbering($("#cart"))
            TotalingRow()
            $("#done").attr('disabled', false)
        }
        else
        {
            $('.qty' + id).text(Quantity() + " pcs");
            $('.qty'+id).val(Quantity());
            TotalingRow()
        }
    });

    $("body").on("click", ".hapus", function () {
        var id = $(this).attr('id')

        
        var total_price = $('.hapus#' + id).closest('tr').find('label.total').attr('data-price-total')


        total_cart -= parseInt(total_price)

        $("#total-price").attr("data-grand-total", total_cart)
        $("#total-price").text('Rp'+total_cart)

        $('.hapus#' + id).closest('tr').remove()

        var cart_item = $('#cart').find('tr[data-cart-item]').length

        if (cart_item == 0) {
            $("#done").attr('disabled', true)
        } else {
            $("#done").attr('disabled', false)
        }
    });


    $('#done').click(function () {
        var money = parseInt($("#user-money").val()),
            grand_total = parseInt($("#total-price").attr("data-grand-total")),
            totaling = money - grand_total

        if (money < grand_total){
            alert("Maaf Uang Anda Kurang Rp" + totaling.toString().substring(1))
        }else if (money == grand_total){
            alert("Terimakasih")
        }else{
            alert("Kembalian Anda Rp" + totaling)
        }
    })

});