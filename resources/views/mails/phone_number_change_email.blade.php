@component('mail::message')
# Mundança de número de telefone

Uma mudança de número de telefone foi solicitada, clique no link abaixo para validala.

@component('mail::button', ['url' =>  $url])
Validar telefone
@endcomponent

Obrigado,<br>
{{ config('app.name') }}
@endcomponent