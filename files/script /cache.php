<?php
if (!isset($_COOKIE['SHOW_MODAL'])){?>
    <script>
        $(document).ready(function() {
            var divPopUp = $('.popup');
            setTimeout(function () {
                divPopUp.fadeIn();
            }, 1000);
            $('.close-popup').on('click', function (e) {
                e.preventDefault();
                divPopUp.fadeOut();
            });
        });
    </script>
<?
    setCookie('SHOW_MODAL', 'Y', time() + 86400, '/'); // Установим куку SHOW_MODAL значение Y на сутки для всех страниц сайта.
}
?>