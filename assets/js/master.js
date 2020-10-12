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
                                    '<label class="total total' + id + '" data-price-total=""></label>' +
                                '</td>' +
                                '<td><button class="hapus" id="">HAPUS</button></td>' +
                            '</tr>'
                ;
            var appendSpan = $('#cart').append(appendTD);
            return appendSpan
        }

        function TotalingAllPrice() {
            var arr = []
            $("#cart").find("[data-cart-item]").each(function () {
                arr.push($(this).find("label.total").attr("data-price-total"))
                var n = arr.length,
                    sum = 0;
                while(n--)
                sum += parseFloat(arr[n])
                $("#total-price").attr("data-grand-total", sum)
                $("#total-price").text(sum)
                
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
            var id = $(this).attr('id');

            if(cart_item == 0){
                $("#done").attr('disabled', true)
            }else{
                $("#done").attr('disabled', false)
            }

            $('.hapus#' + id).closest('tr').remove();

            a = $('.hapus#' + id).closest('tr').find("[data-cart-item]");
            console.log(a,$("#total-price").attr("data-grand-total"))
        });
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