#pragma checksum "C:\Users\Turqay\Desktop\LoveLetter\Love-Letter\Love-Letter\Views\Home\Index.cshtml" "{ff1816ec-aa5e-4d10-87f7-6f4963833460}" "d4883516d173264b227db1c0f2b3cb5e3b1cc9e0"
// <auto-generated/>
#pragma warning disable 1591
[assembly: global::Microsoft.AspNetCore.Razor.Hosting.RazorCompiledItemAttribute(typeof(AspNetCore.Views_Home_Index), @"mvc.1.0.view", @"/Views/Home/Index.cshtml")]
namespace AspNetCore
{
    #line hidden
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.AspNetCore.Mvc.Rendering;
    using Microsoft.AspNetCore.Mvc.ViewFeatures;
#nullable restore
#line 1 "C:\Users\Turqay\Desktop\LoveLetter\Love-Letter\Love-Letter\Views\_ViewImports.cshtml"
using Love_Letter;

#line default
#line hidden
#nullable disable
#nullable restore
#line 2 "C:\Users\Turqay\Desktop\LoveLetter\Love-Letter\Love-Letter\Views\_ViewImports.cshtml"
using Love_Letter.Models;

#line default
#line hidden
#nullable disable
#nullable restore
#line 3 "C:\Users\Turqay\Desktop\LoveLetter\Love-Letter\Love-Letter\Views\_ViewImports.cshtml"
using Love_Letter.ViewModel;

#line default
#line hidden
#nullable disable
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"d4883516d173264b227db1c0f2b3cb5e3b1cc9e0", @"/Views/Home/Index.cshtml")]
    [global::Microsoft.AspNetCore.Razor.Hosting.RazorSourceChecksumAttribute(@"SHA1", @"4224dab69271b8e65078cbf7aebf4557bb1fda71", @"/Views/_ViewImports.cshtml")]
    public class Views_Home_Index : global::Microsoft.AspNetCore.Mvc.Razor.RazorPage<dynamic>
    {
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_0 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("id", new global::Microsoft.AspNetCore.Html.HtmlString("homeImage"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_1 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("src", new global::Microsoft.AspNetCore.Html.HtmlString("~/images/Love-Letter.png"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        private static readonly global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute __tagHelperAttribute_2 = new global::Microsoft.AspNetCore.Razor.TagHelpers.TagHelperAttribute("class", new global::Microsoft.AspNetCore.Html.HtmlString("img-fluid"), global::Microsoft.AspNetCore.Razor.TagHelpers.HtmlAttributeValueStyle.DoubleQuotes);
        #line hidden
        #pragma warning disable 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperExecutionContext __tagHelperExecutionContext;
        #pragma warning restore 0649
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner __tagHelperRunner = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperRunner();
        #pragma warning disable 0169
        private string __tagHelperStringValueBuffer;
        #pragma warning restore 0169
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __backed__tagHelperScopeManager = null;
        private global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager __tagHelperScopeManager
        {
            get
            {
                if (__backed__tagHelperScopeManager == null)
                {
                    __backed__tagHelperScopeManager = new global::Microsoft.AspNetCore.Razor.Runtime.TagHelpers.TagHelperScopeManager(StartTagHelperWritingScope, EndTagHelperWritingScope);
                }
                return __backed__tagHelperScopeManager;
            }
        }
        private global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper;
        #pragma warning disable 1998
        public async override global::System.Threading.Tasks.Task ExecuteAsync()
        {
#nullable restore
#line 1 "C:\Users\Turqay\Desktop\LoveLetter\Love-Letter\Love-Letter\Views\Home\Index.cshtml"
  
    ViewData["Title"] = "Love Letter";
    Layout = "~/Views/Shared/JesusNav.cshtml";

#line default
#line hidden
#nullable disable
            WriteLiteral("\r\n<div class=\"container\">\r\n    <div class=\"row\">\r\n        <div class=\"col-sm-4\">\r\n            <h2>Love Letter</h2>\r\n            <h3>Cover photo of game:</h3>\r\n            ");
            __tagHelperExecutionContext = __tagHelperScopeManager.Begin("img", global::Microsoft.AspNetCore.Razor.TagHelpers.TagMode.StartTagOnly, "d4883516d173264b227db1c0f2b3cb5e3b1cc9e04796", async() => {
            }
            );
            __Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper = CreateTagHelper<global::Microsoft.AspNetCore.Mvc.Razor.TagHelpers.UrlResolutionTagHelper>();
            __tagHelperExecutionContext.Add(__Microsoft_AspNetCore_Mvc_Razor_TagHelpers_UrlResolutionTagHelper);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_0);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_1);
            __tagHelperExecutionContext.AddHtmlAttribute(__tagHelperAttribute_2);
            await __tagHelperRunner.RunAsync(__tagHelperExecutionContext);
            if (!__tagHelperExecutionContext.Output.IsContentModified)
            {
                await __tagHelperExecutionContext.SetOutputContentAsync();
            }
            Write(__tagHelperExecutionContext.Output);
            __tagHelperExecutionContext = __tagHelperScopeManager.End();
            WriteLiteral(@"
            <p>
                2–4 people play.
                First, one card is dealt to each person,
                and one is discarded face-down from the round
                (so the process of elimination cannot be used to prove which cards are left)
                and the rest are deposited face-down into a deck in the middle.
                During each player's turn, he or she draws one card from the deck and plays either that card,
                or the card they already had. After processing the effect described on the discarded card,
                the next player gets a turn. This is repeated until either the deck disappears,
                in which case the player holding the highest card wins the round
                (if tied, then the player with the highest total of cards in their discard pile),
                or until all players but one are eliminated, in which case the remaining player wins the round.
                The deck (including the discarded card) is shuffl");
            WriteLiteral(@"ed, and play begins again.
                Once a player wins the game, that player receives a token of affection.
                The game ends when one player has obtained a predetermined number of tokens of affection
                (normally anywhere from four to seven).
            </p>
        </div>
        <div class=""col-sm-8"">
            <h2>Cards description</h2>
            <table class=""table table-bordered"">
                <thead>
                    <tr>
                        <th>Card</th>
                        <th>Strength</th>
                        <th>Number in deck</th>
                        <th>Effects</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>Guard</td>
                        <td>1</td>
                        <td>5</td>
                        <td>
                            Player designates another player and names a type of card.
                            If");
            WriteLiteral(@" that player's hand matches the type of card specified,
                            that player is eliminated from the round.
                            However, <strong>Guard</strong> cannot be named as the type of card.
                        </td>
                    </tr>
                    <tr>
                        <td>Priest</td>
                        <td>2</td>
                        <td>2</td>
                        <td>Player is allowed to see another player's hand.</td>
                    </tr>
                    <tr>
                        <td>Baron</td>
                        <td>3</td>
                        <td>2</td>
                        <td>
                            Player will choose another player and privately compare hands.
                            The player with the lower-strength hand is eliminated from the round.
                        </td>
                    </tr>
                    <tr>
                        <td>Handmaid</td>
      ");
            WriteLiteral(@"                  <td>4</td>
                        <td>2</td>
                        <td>Player cannot be affected by any other player's card until the next turn.</td>
                    </tr>
                    <tr>
                        <td>Prince</td>
                        <td>5</td>
                        <td>2</td>
                        <td>
                            Player can choose any player (including themselves) to discard their hand and draw a new one.
                            If the discarded card is the <strong>Princess</strong>, the discarding player is eliminated.
                        </td>
                    </tr>
                    <tr>
                        <td>King</td>
                        <td>6</td>
                        <td>1</td>
                        <td>Player trades hands with any other player.</td>
                    </tr>
                    <tr>
                        <td>Countess</td>
                        <td>7</td>
     ");
            WriteLiteral(@"                   <td>1</td>
                        <td>
                            If a player holds both this card and either the <strong>King</strong> or <strong>Prince</strong>
                            card,
                            this card must be played immediately.
                        </td>
                    </tr>
                    <tr>
                        <td>Princess</td>
                        <td>8</td>
                        <td>1</td>
                        <td>If a player plays this card for any reason, they are eliminated from the round.</td>
                    </tr>
                </tbody>
            </table>
            <br>
        </div>
    </div>
</div>");
        }
        #pragma warning restore 1998
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.ViewFeatures.IModelExpressionProvider ModelExpressionProvider { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IUrlHelper Url { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.IViewComponentHelper Component { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IJsonHelper Json { get; private set; }
        [global::Microsoft.AspNetCore.Mvc.Razor.Internal.RazorInjectAttribute]
        public global::Microsoft.AspNetCore.Mvc.Rendering.IHtmlHelper<dynamic> Html { get; private set; }
    }
}
#pragma warning restore 1591
