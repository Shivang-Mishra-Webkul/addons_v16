/* Copyright (c) 2016-Present Webkul Software Pvt. Ltd. (<https://webkul.com/>) */
/* See LICENSE file for full copyright and licensing details. */
/* License URL : https://store.webkul.com/license.html/ */
odoo.define('odoo_saas_kit.plans_snippet_editor', function (require) {
    'use strict';
    
        var publicWidget = require('web.public.widget');
    
        publicWidget.registry.saas_kit_plans = publicWidget.Widget.extend({
            selector: '#saas_plans',

            events: {
                'click #community_btn': '_showCommunityPlans',
                'click #enterprise_btn': '_showEnterprisePlans',
                'click .community_version_button': '_fetch_community_plans',
                'click .enterprise_version_button': '_fetch_enterprise_plans',
                
            },
    
            start: function () {
                this._fetch().then(this._render.bind(this));
                return this._super.apply(this, arguments);
            },
            _fetch: function () {

                return $.get('/saas/version/data')
                .then(function(res) {
                    return res;
                });
            },
            _render: async function (res) {
                await $(".saas_plans").append(res);
                this._fetch_community_plans();
            },

            _fetch_community_plans: function(ev) {
                var self = this;
                if(ev){
                    var version_id = $(ev.currentTarget).attr('data-id');
                    $('.def_community_version_btn').text($(ev.currentTarget).text());
                }
                else{
                    var version_id = $('.def_community_version_btn').attr('data-id');
                }
                return $.get(`/saas/plans/data/${parseInt(version_id)}`)
                .then(function(res) {
                    $('div.community_plans_card').html(res);
                    self._saas_plan_carousel()
                    let cards = document.querySelectorAll('.plan_card');
                    let maxHeight = Math.max(...Array.from(cards).map(card => card.offsetHeight));
                    cards.forEach(card => {
                        card.style.height = `${maxHeight}px`;
                    });
                    return res;
                });
            },

            _fetch_enterprise_plans: function(ev) {
                var self = this;
                if(ev){
                    var version_id = $(ev.currentTarget).attr('data-id');
                    $('.def_enterprise_version_btn').text($(ev.currentTarget).text());
                }
                else{
                    var version_id = $('.def_enterprise_version_btn').attr('data-id');
                }
                
                return $.get(`/saas/plans/data/${parseInt(version_id)}`)
                .then(function(res) {
                    $('div.enterprise_plans_card').html(res);
                    self._saas_plan_carousel()
                    let cards = document.querySelectorAll('.plan_card');
                    let maxHeight = Math.max(...Array.from(cards).map(card => card.offsetHeight));
                    cards.forEach(card => {
                        card.style.height = `${maxHeight}px`;
                    });
                    return res;
                });
            },

            
            _showCommunityPlans: function () {
                $('#enterprise_plans').hide();
                $('#community_plans').show();
            },

            _showEnterprisePlans: function () {
                $('#enterprise_plans').show();
                $('#community_plans').hide();
                this._fetch_enterprise_plans();
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

        });
    
    });
    