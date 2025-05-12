<?php

use PhpCsFixer\Config;
use Symfony\Component\Finder\Finder;

$finder = Finder::create()
    ->in(__DIR__)             // <-- This now scans all subdirectories
    ->name('*.php')
    ->notPath('vendor')
    ->ignoreDotFiles(true)
    ->ignoreVCS(true);

return (new Config())
    ->setRiskyAllowed(true)
    ->setRules([
        '@PSR12' => true,
        'psr_autoloading' => true,
        'strict_param' => true,
        'array_syntax' => ['syntax' => 'short'],
        'ordered_imports' => ['sort_algorithm' => 'alpha'],
        'no_unused_imports' => true,
        'single_quote' => true,
        'no_trailing_whitespace' => true,
        'no_trailing_whitespace_in_comment' => true,
        'blank_line_after_namespace' => true,
        'blank_line_before_statement' => ['statements' => ['return']],
        'no_empty_statement' => true,
        'no_extra_blank_lines' => ['tokens' => ['extra']],
        'phpdoc_order' => true,
        'phpdoc_align' => ['align' => 'vertical'],
        'phpdoc_scalar' => true,
        'phpdoc_summary' => false,
        'phpdoc_no_empty_return' => false,
        'method_argument_space' => ['on_multiline' => 'ensure_fully_multiline'],
        'single_trait_insert_per_statement' => false,
        'class_attributes_separation' => [
            'elements' => ['method' => 'one', 'property' => 'one', 'trait_import' => 'one']
        ],
        'modernize_types_casting' => true,
        'no_short_bool_cast' => true,
        'declare_strict_types' => true,
        'trailing_comma_in_multiline' => ['elements' => ['arrays']],
        'binary_operator_spaces' => [
            'default' => 'single_space',
            'operators' => ['=>' => 'align_single_space_minimal']
        ],
        'yoda_style' => false
    ])
    ->setFinder($finder)
    ->setIndent("    ")
    ->setLineEnding("\n");
