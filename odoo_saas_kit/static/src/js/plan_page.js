/* Copyright (c) 2016-Present Webkul Software Pvt. Ltd. (<https://webkul.com/>) */
/* See LICENSE file for full copyright and licensing details. */
/* License URL : https://store.webkul.com/license.html/ */
odoo.define('odoo_saas_kit.plans_snippet_editor', function (require) {
    'use strict';
    
        var publicWidget = require('web.public.widget');
    
        publicWidget.registry.saas_kit_plans = publicWidget.Widget.extend({
            selector: '.saas_plans',

            events: {
                'click #community_btn': '_showCommunityPlans',
                'click #enterprise_btn': '_showEnterprisePlans',
                
            },
    
            start: function () {
                this._fetch().then(this._render.bind(this));

                return this._super.apply(this, arguments);
            },
            _fetch: function () {
                //return this._rpc({
                //    route: '/saas/plans/data',
                //}).then(res => {
                    // console.log(res);
                //    return res;
                //});
                
                return $.get('/saas/plans/data')
                .then(function(res) {
                    //console.log(res);
                    return res;
                });
            },
            _render: function (res) {
                $(".saas_plans_container").html(res)
                this._saas_plan_carousel()
                const cards = document.querySelectorAll('.plan_card');
                const maxHeight = Math.max(...Array.from(cards).map(card => card.offsetHeight));


                cards.forEach(card => {
                    card.style.height = `${maxHeight}px`;
                });
            },

            _saas_plan_carousel: function () {
                $('.owl-carousel').owlCarousel({
                    margin:30,
                    loop:false,
                    nav:false,
                    dots: false,
                    navigation : false,
                    responsive: {
            
                        200: {
                        items: 1,
                        },
                        600: {
                        items: 2,
                        },
                        1000: {
                        items: 5,
            
                        }
                    },
                })
            },

            _showCommunityPlans: function () {
                $('#enterprise_plans').hide();
                $('#community_plans').show();
            },

            _showEnterprisePlans: function () {
                $('#enterprise_plans').show();
                $('#community_plans').hide();
            },


        });
    
    });
    
