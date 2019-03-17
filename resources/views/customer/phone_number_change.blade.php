@extends('layouts.app')

@section('content')
    <p id="result"> Atualizando...</p>
    <script type="text/javascript">
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 204) {
                document.getElementById('result').innerText = 'Telefone atualizado com sucesso!';
            } else {
                document.getElementById('result').innerText = 'Não foi possível atualizar o telefone.';
            }
        }

        xhttp.open('PATCH', '/aapi/customers/phone_number/{{$token}}', true);
        xhttp.send();
    </script>