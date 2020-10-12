$(document).ready(function () {
    

    
    $(".beli").click(function (e) {
        e.preventDefault();
        
        $('#product-cart').addClass('show');
        $('#emptycart').css('display', 'none');
        
        var id = $(this).attr('id');
        var price = $('.beli#' + id).closest('tr').find("input.product-price").val()
        var cart_item = $('#cart').find('tr[data-cart-item="'+id+'"]').length
        
        function Numbering($table) {
            var no = -1;
            $table.find("tr").each(function (ind, el) {
                numbering = no++;
                $('#cart').find('tr[data-cart-item="' + id + '"]').find("button.hapus").attr("id",numbering)    
                $(el).find("span.no").html(numbering);
            });
        }
        
        
        function Quantity() {
            var qty = $('#cart').find('[data-cart-item="' + id + '"').find('input.qty'+id).val();
            quantity = parseInt(qty)+1
            return quantity
        }

        function TotalingRow() {
            var qty = $('#cart').find('[data-cart-item="' + id + '"').find('input.qty' + id).val();
            var sum = $(".total" + id).html("Rp" + parseInt(price) * parseInt(qty));
            $(".total" + id).attr("data-price-total", parseInt(price) * parseInt(qty));
            return sum
        }

        function GetInfoProduct(inputClassName) {
            var record = $('.beli#' + id).closest('tr').find("input." + inputClassName).val();
            return record
        }

        function CreateNewRow() {
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
                                    '<label class="total' + id + '" data-price-total=""></label>' +
                                '</td>' +
                                '<td><button class="hapus" id="">HAPUS</button></td>' +
                            '</tr>'
                ;
            var appendSpan = $('#cart').append(appendTD);
            return appendSpan
        }

        function TotalingAllPrice() {
            $("#cart").find("[data-cart-item]").each(function () {
                $("#total-price").html(parseInt($(this).find("label.total"+id).attr("data-price-total")))
            })
        }
        
        if (cart_item == 0) {
            CreateNewRow('product-id');
            $('.qty' + id).text(Quantity() + " pcs");
            $('.qty'+id).val(Quantity());
            Numbering($("#cart"))
            TotalingRow()
            $("#done").attr('disabled', false)
        }
        else {
            $('.qty' + id).text(Quantity() + " pcs");
            $('.qty'+id).val(Quantity());
            TotalingRow()
        }
        
        TotalingAllPrice()

        $(".hapus").click(function () {
            var c = $('#cart').find('[data-cart-item="' + id + '"').find('span.total' + id);
            console.log(c)
            if(cart_item == 0){
                $("#done").attr('disabled', true)
            }else{
                $("#done").attr('disabled', false)
            }
            var id = $(this).attr('id');
            // $('.hapus#' + id).closest('tr').remove();
        });
    });


});