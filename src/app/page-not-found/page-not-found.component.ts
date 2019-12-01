import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';

@Component({
  selector: 'app-page-not-found',
  templateUrl: './page-not-found.component.html',
  styleUrls: ['./page-not-found.component.scss']
})
export class PageNotFoundComponent implements OnInit {


  constructor() {
  }

  ngOnInit() {
    $(document).ready(function () {
      var mainArea = $('#mainArea');
      const cols = Math.floor($(window).width() / 12);
      var colwidth = mainArea.width() / cols;
      var counter = 404;
      const colors = ['#d5ab9c', '#e6e696', '#7bc0a3', '#54878f'];
      if ($(window).width() <= 600) {
        var sizes = [45, 30, 60, 70, 80];
      } else {
        var sizes = [50, 35, 75, 90, 110];
      }
      var bubbles = [];

      mainArea.width($(window).width());
      mainArea.height($(window).height());

      function drawCircles() {
        var randSize = Math.floor(Math.random() * sizes.length);
        var randColor = Math.floor(Math.random() * colors.length);
        var randPos = Math.floor(Math.random() * cols);
        var randSpeed = Math.floor(Math.random() * 10) + 5;
        var bubble = $('<div></div>');
        bubble.addClass('circle');
        bubble.css({
          position: 'absolute',
          backgroundColor: colors[randColor],
          width: sizes[randSize] + 'px',
          height: sizes[randSize] + 'px',
          left: randPos * colwidth - colwidth,
          top: mainArea.height()
        });
        bubbles.push(bubble);
        bubble.appendTo("#mainArea");
        bubble.animate({
          top: '-150px'
        }, randSpeed * (($(window).height()) * 3.7), function () {
          $(this).remove();
        });
      }

      if ($(window).width() <= 600) {
        setInterval(drawCircles, 700);
      } else {
        setInterval(drawCircles, 500);
      }

      $('#pagenf').text(counter + ' page not found');

      $(document).on("click", ".circle", function () {
        if ($(this).width() === sizes[0] || $(this).width() === sizes[1]) {
          counter -= 2;
        } else {
          counter--;
        }
        $(this).stop().remove();
        $('#pagenf').text(counter + ' page not found');
        if (counter <= 0) {
          $('#pagenf').text('Congrats, you won! But the page is still not found.');
          $('#pagenf').click(function () {
            counter = 404;
            $('#pagenf').text(counter + ' page not found');
          });
        }
      });
    });
  }
}
